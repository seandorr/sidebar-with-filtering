import React, { useState, useRef, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { plantItems, MaterialItems } from "./utils/constants/items";
import { getTrendIcon } from "./utils/functions/getTrendIcon";
import SidebarContainer from "./components/SidebarContainer/SidebarContainer";
import StatusItem from "./components/StatusItem/StatusItem";
import "./styles/main.scss";

export default function App() {
  const [activeTab, setActiveTab] = useState({ tab1: true, tab2: false });
  const [statusOk, setStatusOk] = useState(false);
  const [statusCritical, setstatusCritical] = useState(false);
  const [activeItem, setActiveItem] = useState(plantItems[0].name);
  const [viewingItemContent, setViewingItemContent] = useState({
    name: plantItems[0].name,
    status: plantItems[0].status,
    trend: plantItems[0].trend,
  });

  const [height, setHeight] = useState(0);
  const fixedHeightRef = useRef(null);

  useEffect(() => {
    setHeight(fixedHeightRef.current.clientHeight);
  });

  const sidebarContainerHeight = {
    height: `calc(100vh - (${height}px + 120px))`,
    minHeight: "80px",
    overflow: "auto",
    borderRadius: "0 0 8px 8px",
  };

  const mappedItems = activeTab.tab1 ? plantItems : MaterialItems;

  function handleOnClickItem(name: string, status: string, trend: string) {
    setActiveItem(name);
    setViewingItemContent({ name: name, status: status, trend: trend });
  }

  return (
    <Layout sidebar sidebarWidth={300}>
      <Sidebar>
        <div className="sidebar-content">
          <div ref={fixedHeightRef} className="fixed-height">
            <h2>{`Status of ${activeTab.tab1 ? "Plants" : "Materials"}`}</h2>
            <div className="tab-group">
              <button
                className={`tab-item ${activeTab.tab1 ? "active-tab" : ""}`}
                onClick={() => setActiveTab({ tab1: true, tab2: false })}
                id="tab-1"
                tabIndex={0}
              >
                <span>Plants</span>
              </button>
              <button
                className={`tab-item ${activeTab.tab2 ? "active-tab" : ""}`}
                onClick={() => setActiveTab({ tab1: false, tab2: true })}
                id="tab-2"
                tabIndex={0}
              >
                <span>Materials</span>
              </button>
            </div>
            <SidebarContainer title="Viewing">
              <div className="status-container">
                <StatusItem
                  status={viewingItemContent.status}
                  size="large"
                  itemText={viewingItemContent.name}
                  trend={viewingItemContent.trend}
                />
              </div>
            </SidebarContainer>
            <SidebarContainer title="Filter by Status">
              <div className="status-container">
                <StatusItem
                  active={statusOk}
                  status="ok"
                  itemText="Status OK"
                  onClick={() => setStatusOk((prevState) => !prevState)}
                  closable
                />
                <StatusItem
                  active={statusCritical}
                  status="critical"
                  itemText="Critical"
                  onClick={() => setstatusCritical((prevState) => !prevState)}
                  closable
                />
              </div>
            </SidebarContainer>
          </div>
          <SidebarContainer
            title={
              <>
                {getTrendIcon("up")}
                <span>12 hour trends</span>
              </>
            }
            style={sidebarContainerHeight}
          >
            <div className="status-container">
              {mappedItems
                .filter((item) => {
                  if (
                    (!statusOk && !statusCritical) ||
                    (statusOk && statusCritical)
                  ) {
                    return item.name !== viewingItemContent.name;
                  }
                  if (statusOk) {
                    return (
                      item.status === "ok" &&
                      item.name !== viewingItemContent.name
                    );
                  }
                  if (statusCritical) {
                    return (
                      item.status === "critical" &&
                      item.name !== viewingItemContent.name
                    );
                  }
                })
                .map((item, key) => {
                  const { name, status, trend } = item;

                  const isActiveItem = name === activeItem;
                  return (
                    <StatusItem
                      active={isActiveItem}
                      key={key}
                      status={status}
                      onClick={() => handleOnClickItem(name, status, trend)}
                      itemText={name}
                      trend={trend}
                    />
                  );
                })}
            </div>
          </SidebarContainer>
        </div>
      </Sidebar>
      <Content />
    </Layout>
  );
}
