import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default defineComponent({
  name: "Logo",
  setup() {
    const router = useRouter();
    const toHome = () => {
      router.push({ path: "/" });
    };

    return () => {
      return (
        <div class="flex justify-center items-center hover:cursor-pointer" onClick={toHome} >
          <SvgIcon
            color="white"
            class="hover:cursor-pointer mr-3"
            name="logo"
            width="1.8rem"
            height="1.8rem"
          />
          <span class="text-xl font-semibold">{import.meta.env.VITE_BLOG_TITLE}</span>
        </div>
      )
    }
  },
});