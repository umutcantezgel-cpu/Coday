export default function DummyComponent({ text }: { text: string }) {
  return (
    <div className="w-full bg-surface p-4 rounded-xl border border-divider">
      <img src="/dummy.jpg" alt="Dummy" />
      <p>{text}</p>
    </div>
  );
}
