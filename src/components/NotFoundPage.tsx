import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import pageNotFound from "@/assets/page-not-found.webp";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-2xl mb-8">Page not find</p>
      <img src={pageNotFound} alt="Product Not Found" className="w-sm mb-8" />
      <Button onClick={() => navigate("/products")} className="text-lg">
        Back to list
      </Button>
    </div>
  );
};

export default NotFoundPage;
