import Link from "next/link";
import { OnboardingFlow } from "../OnboardingFlow";

export default function OnboardingPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#F7FAFF] via-[#FFFFFF] to-[#E8F1FF] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="MedPath"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-[#1B3A2D] text-white shadow-md shadow-[#1B3A2D]/40">
              <span className="text-lg font-semibold">MP</span>
            </div>
            <span className="text-[25px] font-semibold tracking-tight text-[#1B3A2D]">
              MedPath
            </span>
          </Link>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Preview
          </span>
        </div>

        <OnboardingFlow />

        <p className="mt-4 text-center text-xs text-slate-500">
          This is a preview. Submit will not work without auth.
        </p>
      </div>
    </div>
  );
}
