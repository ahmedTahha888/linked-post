import React from "react";
import { Helmet } from "react-helmet";
import { LuCheckCheck } from "react-icons/lu";

const Notifications = () => {
  return (
    <>
     <Helmet>
        <title>Notifications  </title>
      </Helmet>
    <div className="mx-auto max-w-7xl px-3 py-3.5">
      <main className="min-w-0">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Notifications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Realtime updates for likes, comments, shares, and follows.
                </p>
              </div>
              <button
                disabled
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <span>
                  <LuCheckCheck />
                </span>
                <span>Mark all as read</span>
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-center">

                <button
                  type="button"
                  className="rounded-full px-4 py-1.5 text-sm font-bold transition bg-[#1877f2] text-white"
                >
                  All
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Unread
                </button>
            </div>
            <div className="space-y-2 p-3 sm:p-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-sm font-semibold text-slate-500">No notifications yet.</p>

              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
};

export default Notifications;
