import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import { Textarea, PRA_Wrapper, Article } from "@pages/PRA_Calc/styles";
const PRA_Calc = () => {
  const [FirstInput, setFirstInput] = useState("");
  const [preProcessed, setpreProcessed] = useState({});
  const [Genes, setGenes] = useState({});
  const [curRow, setcurRow] = useState(["PatientID", "Final Assignment", ""]);
  const [targetURL, settargetURL] = useState(
    "http://www.pra-calculator.kr/form/view.html"
  );

  const [TableRows, setTableRows] = useState([
    { id: 1, patientID: "8156794", genes: "A B Cw DR DQ", result: "X %" },
  ]);

  const [GeneKeys, setGeneKeys] = useState("id");
  const [GeneValues, setGeneValues] = useState("퍼센티지");
  // const [FormDataState, setFormDataState] = useState({
  //   "qa[]": [],
  //   "qb[]": [],
  //   qbw: [],
  //   "qc[]": [],
  //   "qdr[]": [],
  //   qdr51: false,
  //   qdr52: false,
  //   qdr53: false,
  //   "qdq[]": [],
  // });

  const [PostFormData, setPostFormData] = useState({});
  const [curResult, setcurResult] = useState({});

  const onChangeTextarea = useCallback((e) => {
    setFirstInput(e.target.value);
  }, []);

  const onClickBtn = (e: any) => {
    e.preventDefault();
    let AllGenes: any = {};
    let bundle = FirstInput.split("\n");
    //console.log(bundle);
    let newBundle = bundle.map((val, idx) => {
      return val.split("\t");
    });
    //console.log(newBundle);

    for (let i of newBundle) {
      if (curRow.includes(i[0])) {
        continue;
      }
      let isGenes = i[1] || false;

      // console.log(isGenes);
      if (isGenes && isGenes !== "Negative") {
        if (!AllGenes[i[0]]) {
          AllGenes[i[0]] = `${i[1]}`;
        } else {
          AllGenes[i[0]] += `,${i[1]}`;
        }
      }
    }

    for (const [k, v] of Object.entries(AllGenes)) {
      let splited, newSplited;
      if (typeof v === "string") {
        splited = v.split(",");
        newSplited = splited.map((element: string) => {
          element = element.replace(/(\s*)/g, "");
          return element;
        });
      }
      let _splitResult = newSplited || "No Genes";
      AllGenes[k] = _splitResult;
      // console.log(_splitResult);
    }

    // console.log(AllGenes);

    setpreProcessed(AllGenes);
  };
  const onClickMakeFormData = (e: any) => {
    e.preventDefault();
    let resultObj: any = {};
    for (const [k, v] of Object.entries(preProcessed)) {
      // console.log(k, v);
      let any_v: any;
      any_v = v;
      // console.log(typeof v);

      const newForm = new FormData();
      for (let i of any_v) {
        // console.log(i);

        if (i.startsWith("A")) {
          //console.log(i.slice(1, i.length));
          newForm.append("qa[]", i.slice(1, i.length));
        } else if (i.startsWith("Bw")) {
          newForm.append("qbw", i.slice(2, i.length));
        } else if (i.startsWith("B")) {
          newForm.append("qb[]", i.slice(1, i.length));
        } else if (i.startsWith("Cw")) {
          newForm.append("qc[]", i.slice(2, i.length));
        } else if (i.startsWith("DR51")) {
          newForm.append("qdr51", "51");
        } else if (i.startsWith("DR52")) {
          newForm.append("qdr52", "52");
        } else if (i.startsWith("DR53")) {
          newForm.append("qdr53", "53");
        } else if (i.startsWith("DR")) {
          let qdrResult = i.slice(2, i.length);
          if (qdrResult.includes("(")) {
            qdrResult = qdrResult.split("(")[0];
          }

          newForm.append("qdr[]", qdrResult);
        } else if (i.startsWith("DQ")) {
          let qdqResult = i.slice(2, i.length);
          if (qdqResult.includes("(")) {
            qdqResult = qdqResult.split("(")[0];
          }

          newForm.append("qdq[]", qdqResult);
        }
      }

      // console.log("qa[]", newForm.getAll("qa[]"));
      // console.log("qb[]", newForm.getAll("qb[]"));
      // console.log("qbw[]", newForm.getAll("qbw"));
      // console.log("qc[]", newForm.getAll("qc[]"));
      // console.log("qdr51", newForm.getAll("qdr51"));
      // console.log("qdr52", newForm.getAll("qdr52"));
      // console.log("qdr53", newForm.getAll("qdr53"));
      // console.log("qdr[]", newForm.getAll("qdr[]"));
      // console.log("qdq[]", newForm.getAll("qdq[]"));

      //`https://cors-anywhere.herokuapp.com/${targetURL}`
      axios
        .post(`http://220.122.152.222:8080/${targetURL}`, newForm)
        .then((response) => {
          let resData = response.data;

          let result = resData.split(
            '<div id="" class="smallPrint praUnacceptableLocuses clearfix">'
          );
          result = result[8].split("\n");
          result = result[2];
          result = result.split(" ");
          result = result[3];
          // console.log(result);
          resultObj[k] = result;

          // console.log(JSON.stringify(response, null, 2));
        })
        .catch((error) => {
          console.log("failed", error);
        });
    }

    setGenes(resultObj);

    MakeRows();
  };

  const MakeRows = () => {
    let _rows = [];
    let count = 0;
    for (const [k, v] of Object.entries(preProcessed)) {
      let temp: any = {};
      let g: any = Genes;
      temp["id"] = count;
      temp.patientID = k;
      temp.genes = v;
      temp.result = g[k];
      _rows.push(temp);
      count += 1;
    }
    setGeneKeys(Object.keys(Genes).join("\n"));
    setGeneValues(Object.values(Genes).join("\n"));

    setTableRows(_rows);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, hide: true },
    { field: "patientID", headerName: "PatientID", width: 130 },
    { field: "genes", headerName: "Genes", width: 300 },
    { field: "result", headerName: "Result", width: 130 },
  ];

  let rows = [
    { id: 1, patientID: "8156794", genes: "A B Cw DR DQ", result: "X %" },
  ];

  return (
    <>
      <PRA_Wrapper>
        <div>
          <Button variant="outlined" onClick={onClickBtn}>
            입력데이터 확인
          </Button>
          <Button variant="contained" onClick={onClickMakeFormData}>
            전송하고 결과 확인
          </Button>
        </div>
        <Textarea value={FirstInput} onChange={onChangeTextarea}></Textarea>
      </PRA_Wrapper>
      <Article>
        <section>
          {/* <div>{FirstInput}</div> */}
          {/* <div>{preProcessed}</div> */}

          <div style={{ height: "50rem", width: "100%", background: "white" }}>
            <DataGrid
              rows={TableRows}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              checkboxSelection
            />
          </div>
        </section>
        <section>
          <Button variant="contained" onClick={MakeRows}>
            복붙용
          </Button>
          <div>환자ID</div>
          <div>{GeneKeys}</div>
          <div>퍼센티지</div>
          <div>{GeneValues}</div>
        </section>
      </Article>
    </>
  );
};

export default PRA_Calc;
