import React from 'react'
import { useState,useRef } from 'react'
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Input from '@material-ui/core/Input';
import { DataGrid } from '@mui/x-data-grid';



export default function PRA_Calc() {
    const inputRef = useRef(null);

    let temp_col = [{
        
        field: 'id', headerName: 'ID', width: 90,hide:true
        
    },
    {
        field:'PatientID',
        headerName:'PatientID',
        width:150,
    },
    {
        field:'Final_Assignment',
        headerName:'Final Assignment',
        width:800,
    },
    {
        field:'result',
        headerName:'PRA-result',
        width:150,
    }];
    

    let temp_row = [{
        id:1,
        PatientID:'test',
        Final_Assignment:'test'
    }
    ];

    const [row, set_row] = useState(temp_row);
    const [col, set_col] = useState(temp_col);

    const [origin, set_origin] = useState('');
    const [organized, set_orga] = useState({});
    
    let temp_orga = {
        
    };

    

    

    const post_url = 'http://cpra.inforang.com/form/view.html'
    const form_data = {
        'qa[]': [],
        'qb[]': [],
        'qbw': '',
        'qc[]': [],
        'qdr[]': [],
        'qdr51': '',
        'qdr52': '',
        'qdr53': '',
        'qdq[]': [],
    
    }


    const onChangeTextField = (e)=>{
        set_origin(e.target.value)
        // console.log(origin)
    }
    const onClickBtnForData = (e)=>{
        let splited_data = origin.split('\n');

        // console.log(splited_data);
        for (let row of splited_data){
            let split_row = row.split('\t');
            let patientID = split_row[0];
            let finalAssignment = split_row[1];
            let checkColumn = split_row[2];
            if (checkColumn && checkColumn.startsWith('-')){
                checkColumn = checkColumn.split(':')[0]
                checkColumn = checkColumn.slice(2,checkColumn.length)
            }
            
            // console.log(patientID,finalAssignment,checkColumn)
            if (finalAssignment && finalAssignment != 'Negative'){
                if (!temp_orga[patientID]){
                    temp_orga[patientID] = [finalAssignment]
                } else {
                    temp_orga[patientID].push(finalAssignment)
                }
                
            }

            
            
            
        }


        set_orga(temp_orga)

        set_row('')
        temp_row = [];
        let idx = 0;
        console.log(temp_orga)
        for (let i of Object.entries(temp_orga)){
            
                let tempRowObj = {
                    id:idx,
                    PatientID:i[0],
                    Final_Assignment:i[1].join(''),
    
                };

            
            
            temp_row.push(tempRowObj);
            idx += 1;
            // console.log(tempRowObj.id);
            
        }

        
        // console.log(temp_row)
        set_row(temp_row)
        set_col(temp_col)
        console.log(row,col)
        

    }
    const checkGenes = (str)=>{
        if (str.startsWith('')){

        }
        
    }
    const onSubmitForm = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        
        // formData.append('name', 'zero')
        console.log(organized)
        for (let i of Object.entries(organized)){
            for (let j of i[1]){
                if (j.includes(',')){
                    let jj = j.split(',');
                    for (let jjj of jj){
                        jjj.trim()
                        console.log(jjj)
                        
                    }
                    
                }
            }
        }
    //     fetch('https://www.zerocho.com/api/post/formdata', {
    //       method: 'POST', // POST 메소드 지정
    //       body: formData, // formData를 데이터로 설정
    //     }).then((res) => {
    //       if (res.status === 200 || res.status === 201) {
    //         res.json().then(json => console.log(json));
    //       } else {
    //         console.error(res.statusText);
    //       }
    //     }).catch(err => console.error(err));
        
    }


    
    return (
        <>
            <form onSubmit={onSubmitForm}>
                <div>
                <Button type='submit' variant="outlined" color="primary">
                    전송
                </Button>
                <Button onClick = {onClickBtnForData} variant="outlined">
                    데이터 확인해보기
                </Button>
                </div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="입력하는 곳"
                    multiline
                    maxRows={20}
                    value={origin}
                    style={{width:'70%',border:'solid',borderColor:'GrayText'}}
                    onChange={onChangeTextField}
                />
                <div style={{width:'100%'}}>
                    <DataGrid
                        rows={row}
                        columns={col}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        // checkboxSelection
                        // disableSelectionOnClick
                        autoHeight={true}
                    />
                </div>
                

            </form>
        </>
    )
}
