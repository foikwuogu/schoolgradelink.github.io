"use client";

import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  organization: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Contact form submitted:", data);
    alert("Thank you for contacting SchoolGrade Link. We will respond shortly.");
    reset();
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="mt-6 text-2xl font-bold">Contact Us</h1>
      <p className="mt-2 text-sm">
        Let’s talk about your cybersecurity, infrastructure, and hardware needs.
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2 text-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg bg-white p-4 shadow space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold">Name</label>
            <input
              {...register("name")}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold">Organization</label>
            <input
              {...register("organization")}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold">Message</label>
            <textarea
              rows={4}
              {...register("message")}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-sglinkBlue px-4 py-2 text-xs font-semibold text-white"
          >
            Send Message
          </button>
        </form>

        <div>
          <h2 className="font-semibold">Contact Details</h2>
          <p className="mt-2">
            <strong>Email:</strong> schoolgrade4all@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +234 807 641 9643
          </p>
          <p>
            <strong>WhatsApp:</strong> +234 703 725 1531, +234 807 641 9643
          </p>
          <p className="mt-2">
            <strong>Headquarters:</strong> PTI Complex, PMB 20, Warri, Delta
            State, Nigeria.
          </p>
        </div>
      </div>
    </div>
  );
}
