"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";
import type { ImageField, KeyTextField } from "@prismicio/client";

type DonateFormProps = {
  image?: ImageField;
  heading?: KeyTextField;
};

/**
 * Defers Stripe.js until the donation form is close to the viewport. This
 * keeps Stripe available for donors while avoiding a third-party checkout load
 * on unrelated page views.
 */
export function LazyDonateForm(props: DonateFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [DonateForm, setDonateForm] = useState<ComponentType<DonateFormProps> | null>(null);

  useEffect(() => {
    const loadDonateForm = () => {
      void import("./DonateForm").then(({ default: Component }) => {
        setDonateForm(() => Component);
      });
    };

    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) {
      loadDonateForm();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadDonateForm();
      },
      { rootMargin: "300px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {DonateForm ? <DonateForm {...props} /> : <div className="min-h-24" aria-hidden="true" />}
    </div>
  );
}
