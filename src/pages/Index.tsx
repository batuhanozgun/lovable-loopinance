
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const Index = () => {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Loopinance'e Hoş Geldiniz
            </h1>
            <p className="text-xl text-gray-600">
              Finansal takibinizi kolaylaştırın
            </p>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Index;
