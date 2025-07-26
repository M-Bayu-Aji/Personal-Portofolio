export default function TextSpan({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="text-[#0000FF] font-bricolage">{children}</span>
    </>
  );
}