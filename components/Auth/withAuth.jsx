"use client";

import ApiKit from "@/common/helpers/ApiKit";
import { LINKS } from "@/constants/Links";
import { logout } from "@/utilities/authHelper";
import { get, isEmpty } from "lodash";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";

export default function withAuth(Component, role = "") {
  const Authenticated = (props) => {
    const { authStore } = props;
    const {
      setAuth,
      setMe,
      setSettings,
      setPermissionGroup,
      getAuth,
      getMe,
      getPermissionGroup,
    } = authStore;
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const isAuthenticated = getAuth;
    const onClear = () => {
      setAuth(false);
      setMe(null);
      setSettings({});
      setPermissionGroup({});
    };
    const callAuthApi = () => {
      const onSuccess = (response) => {
        const result = get(response, "data.result", {});
        const permissionGroup = get(result, "permissionGroup", {});
        setAuth(true);
        setMe({ ...result });
        setSettings(get(result, "settings", {}));
        setPermissionGroup(permissionGroup);
      };
      const onError = (error) => {
        if (error) {
          onClear();
        }
      };
      ApiKit.auth
        .getMe()
        .then(onSuccess)
        .then(onError)
        .finally(() => setLoading(false));
    };
    const token =
      typeof window !== "undefined"
        ? window?.localStorage?.getItem("token")
        : "";
    useEffect(() => {
      if (token) {
        callAuthApi();
      } else {
        onClear();
        setLoading(false);
        logout(router);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <LoadingSpinner isLoading={loading} />
        </div>
      );
    }

    if (!loading && isEmpty(getMe)) {
      router.push(LINKS.signin.path, LINKS.signin.path, { shallow: true });
    }

    if (!isAuthenticated && !loading) {
      return <div>Unauthorized</div>;
    }

    if (getAuth && isAuthenticated) {
      return <Component {...props} />;
    }

    return null;
  };

  Authenticated.displayName = `Authenticated(${getDisplayName(Component)})`;

  return inject("authStore", "rootStore", "uiStore")(observer(Authenticated));
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
