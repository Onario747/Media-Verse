import HeroSlideItem from "@/components/Hero/HeroSlideItem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Hero = async () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroSlideItem />
    </QueryClientProvider>
  );
};

export default Hero;
