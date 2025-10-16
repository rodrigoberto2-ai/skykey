export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-accent text-3xl mb-4 text-primary">Contact</h1>
      <p className="text-muted-foreground max-w-2xl mb-6">
        Have questions or need support? Reach out and we’ll get back to you.
      </p>
      <div className="grid gap-4 max-w-md">
        <a href="mailto:hello@skykey.com" className="underline">hello@skykey.com</a>
        <a href="tel:+000000000" className="underline">+0 (000) 000-0000</a>
      </div>
    </div>
  );
}
