"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (!digits) return "";

  if (digits[0] === "8" || digits[0] === "7") {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  let result = "+7";
  if (digits.length > 0) result += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) result += ")";
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`;
  return result;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [contact, setContact] = useState("");

  function handleContactChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    const looksLikeEmail = /[a-zA-Zа-яА-ЯёЁ@]/.test(raw);
    if (looksLikeEmail) {
      setContact(raw);
      return;
    }
    setContact(formatPhone(raw));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      contact: (form.elements.namedItem("contact") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setContact("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="form" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Обратная связь</h2>
        <p className={styles.intro}>
          Оставьте заявку или вопрос — мы свяжемся с&nbsp;вами в&nbsp;ближайшее
          рабочее время.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Имя</span>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Как к вам обращаться"
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Телефон или e-mail</span>
              <input
                className={styles.input}
                type="text"
                name="contact"
                placeholder="+7 (___) ___-__-__ или @mail"
                value={contact}
                onChange={handleContactChange}
                required
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Сообщение</span>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Расскажите о проекте или задайте вопрос"
              required
            />
          </label>

          <label className={styles.checkboxField}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="consent"
              required
            />
            <span className={styles.checkboxLabel}>
              Согласие на обработку персональных данных<br/> и соглашение с политикой конфиденциальности
            </span>
          </label>

          <div className={styles.footer}>
            <button
              type="submit"
              className={styles.submit}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Отправляем…" : "Отправить"}
              <span aria-hidden="true">→</span>
            </button>

            {status === "success" && (
              <span className={`${styles.status} ${styles.statusSuccess}`}>
                Спасибо! Заявка отправлена.
              </span>
            )}
            {status === "error" && (
              <span className={`${styles.status} ${styles.statusError}`}>
                Не удалось отправить. Попробуйте ещё раз.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
