import * as React from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useStyles } from "../../styles/common";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { getListProcess } from "../../api/processes";
import css from "../../components/PaginationTable.module.css";
import { PaginationTable } from "../../components/PaginationTable";
import { Process, Processes } from "../../types/processes";
import Grid from "@mui/material/Grid";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditIcon from "@mui/icons-material/Edit";

export const ProcessList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1);
  const handleViewDetail = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    navigate(`/processes/edit/${params.row["id"]}`, {
      replace: true,
      state: { data: params.row as Process },
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const dataQuery = useQuery({
    queryKey: ["processes", pagination, searchTerm],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListProcess(pagination, 10, searchTerm, controller.signal);
    },
    keepPreviousData: false,
    retry: 0,
  });

  useEffect(() => {
    queryClient.refetchQueries(["processes", pagination, searchTerm]);
  }, [searchTerm]);

  const onPageChange = (page: number) => {
    setPagination(page);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      headerAlign: "left",
      flex: 1,
      type: "string",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "parentName",
      headerName: "Parent Name",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "parentId",
      headerName: "Parent Id",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "type",
      headerName: "Type",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "focusField",
      headerName: "Focus Field",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },

    {
      field: "active",
      headerName: "Active",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "edit",
      headerName: "Edit",
      type: "any",
      flex: 0,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column-no-border"],
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
  return (
    <div>
      <div
        style={{
          height: "100%",
          width: "90%",
          margin: "2.5% 0% 0% 5%",
        }}
      >
        <KeyboardBackspaceIcon
          onClick={handleClick}
          className={classes.backIcon}
          style={{ display: "flex", marginBottom: "10px" }}
        />

        <Grid container spacing={2} style={{ marginBottom: "10px" }}>
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <TextField
              style={{
                width: "300px",
              }}
              id="outlined-basic"
              size="small"
              value={searchTerm}
              defaultValue={""}
              placeholder="Value"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4} alignItems="flex-end" direction="row">
            <Typography style={{ fontSize: "24px" }}>Processes List</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              style={{
                height: "40px",
                width: "100px",
                backgroundColor: "blue",
                color: "white",
              }}
              onClick={() => navigate("/processes/create")}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <PaginationTable
          columns={columns}
          pagination={pagination}
          dataQuery={
            (dataQuery.data?.data as Processes) || { data: [], total: 0 }
          }
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
