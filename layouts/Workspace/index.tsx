import React from "react";
import PRA_Calc from "@pages/PRA_Calc";
import { Link, Switch, Route } from "react-router-dom";
import { WorkSpace } from "@layouts/Workspace/styles";

const Workspace = () => {
  return (
    <>
      <WorkSpace>
        <header>
          <div className="header-container">
            <div>
              <Link to="/praCalculator">신장보따리</Link>
            </div>
            <div>
              <Link to="/attackOnGenes">유전자대조</Link>
            </div>
            <nav>
              <img
                src="https://tlgrm.eu/_/stickers/a41/f44/a41f44da-1fbf-4127-8e99-30649c6b7b01/192/1.webp"
                alt="개발자한테 앙망하기"
              />
              <div>개발자한테 문의하기</div>
            </nav>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/praCalculator" component={PRA_Calc}></Route>
            {/* <Route path='/praCalculator' component={PRA_Calc}></Route> */}
          </Switch>
          <div></div>
        </main>
      </WorkSpace>
    </>
  );
};

export default Workspace;
