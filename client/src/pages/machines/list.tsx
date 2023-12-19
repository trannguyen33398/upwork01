import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Button, Pagination, TextField } from "@mui/material";
import { useQueryString } from "../../utils/utils";
import { useQuery } from "react-query";
import { getListMachine } from "../../api/machine";
import {Machine, Machines} from "../../types/machines";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useStyles } from "../../styles/common";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import {PaginationTable} from "../../components/PaginationTable";
import {Processes} from "../../types/processes";
import css from "../../components/PaginationTable.module.css";

const styles = {
  dataGrid: {
    flexGrow: 1,
    width: "100%",
  },
};

export const MachineList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1);
  const handleViewDetail = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    navigate(`/machines/edit/${params.row["id"]}`, {
      replace: true,
      state: { data: params.row as Machine },
    });
  };
 
  const [searchTerm, setSearchTerm] = useState("");
  const dataQuery = useQuery({
    queryKey: ["machines", pagination,searchTerm],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListMachine(pagination, 10, searchTerm, controller.signal);
    },
    keepPreviousData: false,
    retry: 0,
  });

  useEffect(() => {
     
    queryClient.refetchQueries(["machines", pagination]);
    
  }, [searchTerm]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      headerAlign: "left",
      flex: 1,
      type: "string",
      sortable : false,
      headerClassName : css['header-column']
    },
    {
      field: "parentName",
      headerName: "Parent Name",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable : false,
      headerClassName : css['header-column']
    },
    {
      field: "parentId",
      headerName: "Parent Id",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable : false,
      headerClassName : css['header-column']
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable : false,
      headerClassName : css['header-column']
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable : false,
      headerClassName : css['header-column']
    },

    {
      field: "active",
      headerName: "Active",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable : false,
      headerClassName : css['header-column']
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable : false,
      headerClassName : css['header-column']
    },
    {
      field: "edit",
      headerName: "Edit",
      type: "any",
      flex: 0,
      headerAlign: "left",
      sortable : false,
      headerClassName : css['header-column-no-border'],
      renderCell: (params) => (
        <EditIcon onClick={() => handleViewDetail(params)}>Edit</EditIcon>
      ),
    },
  ];
  const classes = useStyles();

  const handleClick = () => {
    // Navigate to another component
    navigate("/");
  };

  const onPageChange = (page : number) => {
    setPagination(page)
  }

  return (
    <div>
      <div
        style={{
          height: "100%",
          width: "90%",
          margin: "2.5% 0% 0% 5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <KeyboardBackspaceIcon
          onClick={handleClick}
          className={classes.backIcon}
        />
        <div
          style={{
            display: "flex",
            margin: "1.5% 0%",
            flexDirection: "row",
          }}
        >
          <TextField
            style={{
              width: "14%",
            }}
            id="outlined-basic"
            size="small"
            value={searchTerm}
            defaultValue={""}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            style={{
              height: "10%",
              width: "10%",
              margin: "0% 0% 0% auto",
            }}
            onClick={() => navigate("/machine/create")}
          >
            Add
          </Button>
        </div>
        <PaginationTable columns={columns} pagination={pagination} dataQuery={dataQuery.data?.data as Machines || {data : [] , total : 0}} onPageChange={onPageChange}/>
        </div>

    </div>
  );
};
