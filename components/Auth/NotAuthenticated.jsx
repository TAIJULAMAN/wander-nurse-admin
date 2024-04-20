import get from "lodash/get";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import ApiKit from "@/common/helpers/ApiKit";
import { logout } from "@/utilities/authHelper";

function NotAuthenticated({ authStore, children }) {
  const { getAuth, getMe } = authStore;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const router = useRouter();

  const onCallMeApi = () => {
    if (getMe) {
      router.push("/dashboard");
      return;
    }

    const token =
      typeof window !== "undefined"
        ? window?.localStorage?.getItem("token")
        : "";
    if (isEmpty(token)) {
      setData({});
      setIsLoading(false);
      return;
    }
    const handleActionOnMeApiCall = (data) => {
      if (isEmpty(data)) {
        logout({ router });
      } else {
        router.push("/dashboard");
      }
      setIsLoading(false);
    };

    const onSuccess = (response) => {
      const data = get(response, "data", null);
      handleActionOnMeApiCall(data);
      setData(data);
    };
    const onError = (error) => {
      logout({ router, error });
      setIsLoading(false);
    };
    ApiKit.auth.getMe().then(onSuccess).catch(onError);
  };
  useEffect(() => {
    onCallMeApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoading && isEmpty(data)) {
    return children;
  }
}

export default inject("authStore")(observer(NotAuthenticated));
