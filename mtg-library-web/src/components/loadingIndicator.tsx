import * as React from "react";
import { Icon, Spin } from "antd";
import styled from "styled-components";
import { SpinProps } from "antd/lib/spin";

const Spinner = (styled(Spin)`
  i {
    font-size: 2em;
    width: 2em;
    height: 2em;
  }
` as any) as React.ComponentType<SpinProps>;

export function LoadingIndicator(): JSX.Element {
  return <Spinner indicator={<Icon type="loading" spin />} />;
}
