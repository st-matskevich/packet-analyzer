#include "listener.hpp"
#include <nan.h>
#include <uv.h>

uv_async_t gotPacket;
Nan::Persistent<v8::Function> callback;
Listener listener;
Packet lastPacket;

void GotPacket(uv_async_t *handle)
{
	v8::Isolate *isolate = v8::Isolate::GetCurrent();
	Packet *packet = (Packet *)handle->data;

	v8::Local<v8::Object> result = Nan::New<v8::Object>();
	result->Set(isolate->GetCurrentContext(), Nan::New("protocol").ToLocalChecked(), Nan::New(packet->protocol));
	result->Set(isolate->GetCurrentContext(), Nan::New("size").ToLocalChecked(), Nan::New(packet->data_size));
	result->Set(isolate->GetCurrentContext(), Nan::New("from").ToLocalChecked(), Nan::New(packet->from).ToLocalChecked());
	result->Set(isolate->GetCurrentContext(), Nan::New("to").ToLocalChecked(), Nan::New(packet->to).ToLocalChecked());
	result->Set(isolate->GetCurrentContext(), Nan::New("data").ToLocalChecked(), Nan::New(packet->readable_data).ToLocalChecked());
	result->Set(isolate->GetCurrentContext(), Nan::New("hex").ToLocalChecked(), Nan::New(packet->hex_data).ToLocalChecked());

	const int argc = 1;
	v8::Local<v8::Value> argv[argc] = {result};
	v8::Local<v8::Function>::New(isolate, callback)->Call(isolate->GetCurrentContext(), v8::Null(isolate), argc, argv);
}

void StartListen(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
	if (info.Length() < 1 || !info[0]->IsFunction())
	{
		return;
	}

	listener.stop();
	v8::Local<v8::Function> local = v8::Local<v8::Function>::Cast(info[0]);
	callback.Reset(local);

	listener.listen(Listener::get_ips()[0], [](Packet packet) {
		lastPacket = packet;
		gotPacket.data = (void *)&lastPacket;
		uv_async_send(&gotPacket);
	});

	uv_async_init(uv_default_loop(), &gotPacket, GotPacket);
}

void StopListen(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
	listener.stop();
}

void GetHostname(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
	std::string hostname = Listener::get_hostname();
	info.GetReturnValue().Set(Nan::New(hostname).ToLocalChecked());
}

void GetIPs(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
	v8::Isolate *isolate = v8::Isolate::GetCurrent();
	std::vector<unsigned int> ips = Listener::get_ips();
	v8::Local<v8::Array> result = Nan::New<v8::Array>(ips.size());
	for (int i = 0; i < ips.size(); i++)
	{
		v8::Local<v8::Object> ip = Nan::New<v8::Object>();
		ip->Set(isolate->GetCurrentContext(), Nan::New("string").ToLocalChecked(), Nan::New(ip_to_string(ips[i])).ToLocalChecked());
		ip->Set(isolate->GetCurrentContext(), Nan::New("key").ToLocalChecked(), Nan::New(ips[i]));
		result->Set(isolate->GetCurrentContext(), i, ip);
	}

	info.GetReturnValue().Set(result);
}

NAN_MODULE_INIT(Init)
{
	Nan::Set(target, Nan::New("listen").ToLocalChecked(),
			 Nan::GetFunction(Nan::New<v8::FunctionTemplate>(StartListen)).ToLocalChecked());

	Nan::Set(target, Nan::New("stop").ToLocalChecked(),
			 Nan::GetFunction(Nan::New<v8::FunctionTemplate>(StopListen)).ToLocalChecked());

	Nan::Set(target, Nan::New("getHostname").ToLocalChecked(),
			 Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetHostname)).ToLocalChecked());

	Nan::Set(target, Nan::New("getIPs").ToLocalChecked(),
			 Nan::GetFunction(Nan::New<v8::FunctionTemplate>(GetIPs)).ToLocalChecked());
}

NODE_MODULE(addon, Init)