"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 1, label: "Vehicle" },
  { id: 2, label: "Service" },
  { id: 3, label: "Schedule" },
  { id: 4, label: "Confirm" },
];

const services = [
  "Express Detail — from $450",
  "Paint Correction — from $1,800",
  "Ceramic Coating — from $3,200",
  "Concours Preparation — from $6,500",
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    make: "", model: "", year: "", color: "",
    service: "", name: "", email: "", phone: "",
    date: "", notes: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const inputCls = "w-full bg-transparent border border-frost/10 focus:border-mist/50 px-5 py-3.5 font-sans text-[13px] text-frost placeholder-platinum/25 outline-none transition-colors duration-300";
  const labelCls = "block font-mono text-[9px] tracking-[0.3em] text-platinum/40 uppercase mb-2";

  return (
    <div className="bg-ink pt-32 pb-24 min-h-screen">
      <div className="px-6 md:px-10 lg:px-16 max-w-2xl">
        <p className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-6">
          Reserve
        </p>
        <h1 className="font-display text-[clamp(2.5rem,5vw,6rem)] leading-[0.88] tracking-[-0.04em] text-frost mb-16">
          Book a slot.
        </h1>

        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-16">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                className={`flex items-center gap-2 ${step >= s.id ? "text-frost" : "text-platinum/30"} transition-colors duration-300`}
                onClick={() => step > s.id && setStep(s.id)}
              >
                <span className="font-mono text-[10px] tracking-[0.2em]">{String(s.id).padStart(2, "0")}</span>
                <span className="font-sans text-[11px] hidden sm:block">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`mx-3 h-[1px] w-8 transition-colors duration-500 ${step > s.id ? "bg-mist/40" : "bg-frost/10"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl text-frost mb-8">Tell us about your vehicle.</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Make</label>
                  <input className={inputCls} placeholder="Porsche" value={form.make} onChange={e => update("make", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Model</label>
                  <input className={inputCls} placeholder="911 GT3 RS" value={form.model} onChange={e => update("model", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Year</label>
                  <input className={inputCls} placeholder="2024" value={form.year} onChange={e => update("year", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Colour</label>
                  <input className={inputCls} placeholder="Chalk" value={form.color} onChange={e => update("color", e.target.value)} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <h2 className="font-display text-2xl text-frost mb-8">Select a service.</h2>
              <div className="space-y-2">
                {services.map((s) => (
                  <button
                    key={s}
                    onClick={() => update("service", s)}
                    className={`w-full text-left px-5 py-4 border transition-all duration-300 font-sans text-[13px] ${
                      form.service === s
                        ? "border-mist/60 text-frost bg-deep/20"
                        : "border-frost/10 text-platinum/60 hover:border-frost/20 hover:text-platinum"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl text-frost mb-8">Your details & preferred date.</h2>
              <div>
                <label className={labelCls}>Full Name</label>
                <input className={inputCls} placeholder="Jonathan McLaren" value={form.name} onChange={e => update("name", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" className={inputCls} placeholder="you@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input type="tel" className={inputCls} placeholder="+1 (310) 555-0000" value={form.phone} onChange={e => update("phone", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Preferred Drop-Off Date</label>
                <input type="date" className={inputCls} value={form.date} onChange={e => update("date", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Additional Notes</label>
                <textarea
                  rows={3}
                  className={inputCls + " resize-none"}
                  placeholder="Any specific concerns or requests..."
                  value={form.notes}
                  onChange={e => update("notes", e.target.value)}
                />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <h2 className="font-display text-2xl text-frost mb-8">Review & submit.</h2>
              <div className="border border-frost/10 p-6 space-y-4 mb-8">
                {[
                  ["Vehicle", `${form.year} ${form.make} ${form.model} — ${form.color}`],
                  ["Service", form.service],
                  ["Name", form.name],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Date", form.date],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start gap-6">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-platinum/30 uppercase w-16 flex-shrink-0 pt-0.5">{k}</span>
                    <span className="font-sans text-[13px] text-platinum">{v || "—"}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[12px] text-platinum/40 leading-relaxed mb-8">
                By submitting, you agree to be contacted by our team to confirm availability. All appointments are subject to confirmation.
              </p>
              <button
                className="w-full border border-mist/40 hover:border-mist py-4 font-mono text-[12px] tracking-[0.3em] text-mist uppercase hover:text-frost transition-all duration-500"
                onClick={() => alert("Thank you. We'll be in touch within 24 hours.")}
              >
                Submit Request →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex justify-between mt-12 pt-8 border-t border-frost/5">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="font-mono text-[11px] tracking-[0.2em] text-platinum/40 uppercase hover:text-platinum transition-colors duration-300"
              >
                ← Back
              </button>
            ) : <div />}
            <button
              onClick={() => setStep(s => s + 1)}
              className="font-mono text-[11px] tracking-[0.2em] text-mist uppercase hover:text-frost transition-colors duration-300"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
