
import { SignupForm } from "../components/SignupForm";

export const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">Hesap Oluştur</h1>
          <p className="text-gray-600">
            Loopinance'e hoş geldiniz. Hesabınızı oluşturun ve finansal
            takibinize başlayın.
          </p>
        </div>
        <SignupForm />
        <div className="text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700">
            Giriş yapın
          </a>
        </div>
      </div>
    </div>
  );
};
