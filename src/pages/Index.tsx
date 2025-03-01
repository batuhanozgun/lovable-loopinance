
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{t("common:welcome")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
          <h2 className="text-xl font-semibold mb-2">Financial Summary</h2>
          <p className="text-muted-foreground">View your latest financial activities and summaries.</p>
        </div>
        <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
          <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
          <p className="text-muted-foreground">Monitor your recent spending and income patterns.</p>
        </div>
        <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
          <h2 className="text-xl font-semibold mb-2">Budget Goals</h2>
          <p className="text-muted-foreground">Track your progress towards financial objectives.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
