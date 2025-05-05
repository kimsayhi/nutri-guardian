"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col items-center gap-10 pt-10 xl:flex-row xl:justify-center xl:pt-0">
        <div className="flex flex-col justify-center text-4xl font-bold xl:items-end">
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pb-3 text-lg"
          >
            급식 영양소 분석 서비스
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            우리아이 영양은
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            영양지킴이가
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            지켜줄게요
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="py-3"
          >
            <Button onClick={() => router.push("/login")} variant={"secondary"} className="w-50">
              우리 아이 식단 분석하러 가기
            </Button>
          </motion.div>
        </div>
        <motion.div
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          initial={{
            opacity: 0,
            x: 100,
          }}
          transition={{
            duration: 1,
          }}
          className="relative h-[500px] w-full xl:h-200 xl:w-80"
        >
          <Image
            src="/images/landing-menu.png"
            alt="식단 이미지"
            className="object-contain"
            fill
            sizes="100"
          />
        </motion.div>
        <motion.div
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          initial={{
            opacity: 0,
            x: 100,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="relative h-[500px] w-full xl:top-10 xl:-left-30 xl:h-200 xl:w-80"
        >
          <Image
            src="/images/landing-report.png"
            alt="리포트이미지"
            className="rounded-lg object-contain"
            fill
            sizes="100"
          />
        </motion.div>
      </div>
    </div>
  );
}
