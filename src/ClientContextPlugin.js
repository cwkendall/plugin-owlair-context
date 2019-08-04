import { FlexPlugin } from "flex-plugin";
import React from "react";
import CustomCRMComponent from "./CustomCRMComponent";

import * as OwlAirTheme from "./brand/OwlAirSignal";

const PLUGIN_NAME = "ClientContextPlugin";

export default class ClientContextPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  getLoyaltyColors = tier => {
    if (!tier || !this.loyalty) {
      return { background: "transparent" };
    }
    return this.loyalty[tier.toLowerCase()];
  };

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    const brand = "OwlAir"; //manager.workerClient.attributes;
    if (brand) {
      const config = { OwlAir: { ...OwlAirTheme }};
      const { colorTheme, strings, componentProps, loyaltyProps } = config[brand];
      if (strings) {
        Object.assign(manager.strings, strings);
      }
      this.loyalty = loyaltyProps;
      manager.updateConfig({
        colorTheme: colorTheme,
        componentProps: componentProps
      });
    }

    const LoyaltyBadge = props => {
      const colors = this.getLoyaltyColors(props.task.attributes.tier);
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            width: "12px",
            height: "40px",
            transform: "skew(-20deg)",
            background: colors.background,
            color: colors.color
          }}
        />
      );
    };

    flex.TaskListButtons.Content.add(<LoyaltyBadge key="loyalty-badge" />);

    flex.Actions.addListener("beforeAcceptTask", payload => {
      if (flex.TaskHelper.isCallTask(payload.task)) {
        const fromAttribute = payload.task.attributes.from;
        const clientTest = /[a-zA-Z]/;
        if (clientTest.test(fromAttribute)) {
          payload.conferenceOptions.from = fromAttribute;
        }
      }
    });

    flex.Actions.addListener("beforeSelectTask", payload => {
      if (payload.task) {
        const productArea = payload.task.attributes.productArea;

        flex.AgentDesktopView.Panel2.Content.replace(
          <CustomCRMComponent
            key="demo-crm-component"
            productArea={productArea}
            brandName={brand}
            header={this.getLoyaltyColors(payload.task.attributes.tier)}
            attributes={payload.task.attributes}
          />,
          {
            sortOrder: -1
          }
        );
      }
    });

    flex.Actions.addListener("beforeCompleteTask", payload => {
      flex.AgentDesktopView.Panel2.Content.replace(
        <CustomCRMComponent key="demo-crm-component" productArea="noTask" brandName={brand} />,
        {
          sortOrder: -1
        }
      );
    });

    // flex.Actions.addListener("beforeAcceptTask", payload => {
    //   payload.conferenceOptions.record = "true";
    //   payload.conferenceOptions.recordingStatusCallback = "";
    // });

    flex.AgentDesktopView.Panel2.Content.replace(
      <CustomCRMComponent key="demo-crm-component" productArea="noTask" brandName={brand} />,
      {
        sortOrder: -1
      }
    );

    const MyCustomTaskInfoPanelItem = props => {
      const data = props.task.source.attributes || {};
      return (
        <div class="Twilio">
          <br />
          <hr />
          <h1>Customer Attached Data</h1>
          <ul>
            {Object.entries(data).map((item, index) => {
              if (item[0] === "counterConfig") return null;
              return (
                <li key={"task-attr-item-" + index}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>{String(item[0])}:</span> {String(item[1])}
                </li>
              );
            })}
          </ul>
        </div>
      );
    };
    flex.TaskInfoPanel.Content.add(<MyCustomTaskInfoPanelItem key="custom-task-info" />, {
      if: props => !!props.task
    });
  }
}
