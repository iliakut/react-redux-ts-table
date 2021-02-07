import React from "react";
import FirmsTable from "./FirmsTable";
import {tableConfig} from "../configs/dataConfigs";
import {Container} from "@material-ui/core";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

const Content: React.FC = () => {
  const data = useSelector((state: RootState) => state.firms.firms)

  return (
    <Container>
      <h1>Martian consumers</h1>
      <FirmsTable
        headers={tableConfig.headers}
        rowsKeysToShow={tableConfig.rowsToShow}
        rows={data}/>
    </Container>
  );
};

export default Content;
