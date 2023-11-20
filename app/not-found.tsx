import Link from "next/link";

import NotFoundIcon from "@/assets/svg/404.svg";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="mx-auto flex w-full max-w-3xl flex-col mt-56 items-center text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">404 Error</h1>
          <p className="mx-auto mb-5 max-w-lg text-sm text-[#636262] sm:text-base md:mb-6 lg:mb-8">
            哦豁！页面跑丢了。我们派出了搜索队，但看起来这一页已经离家出走了。
          </p>
          <Link href="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
