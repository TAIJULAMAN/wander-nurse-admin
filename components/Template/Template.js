import React from "react";

function RAfff() {
  return (
    <div className="my-6">
      <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-extrabold">Let us Talk</h1>
          <p className="text-sm text-gray-400 mt-3">
            Have some big idea or brand to develop and need help? Then reach out
            we would love to hear about your project and provide help.
          </p>
        </div>

        <form
          action="https://fabform.io/f/xxxxx"
          method="post"
          className="ml-auto space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <textarea
            placeholder="Message"
            rows="6"
            name="message"
            className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
          ></textarea>
          <button
            type="submit"
            className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default RAfff;
