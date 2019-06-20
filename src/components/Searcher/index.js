import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { debounce } from "lodash";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Pagination from "material-ui-flat-pagination";

import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

import getApiByName from "libs/getApiByName";
import getApiById from "libs/getApiById";

import { K_ROUTE_LOGIN, K_CODE_SEARCH_SUCCESS_MINIMUM } from "utils/constants";

class Searcher extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      count: 10,
      page: 0,
      payload: [],
      offset: 0
    };
    this.onChangeDebounced = debounce(this.onChangeDebounced, 300);
  }

  handleInputChange = event => {
    this.setState(
      {
        query: event.target.value,
        payload: [{ name: "Searching..." }]
      },
      this.onChangeDebounced
    );
  };

  handlePageChange = (event, offset, page) => {
    this.setState(
      {
        offset,
        page,
        payload: [{ name: "Searching..." }]
      },
      this.actionSearch
    );
  };

  handleCountChange = event => {
    this.setState({ count: event.target.value }, this.actionSearch);
  };

  actionSearch = () => {
    const { setToken, getToken } = this.props;
    const { query, count, page } = this.state;
    (isNaN(query)
      ? getApiByName(query, count, page, getToken())
      : getApiById(query, count, page, getToken())
    ).then(response => {
      const isSearchSuccess = response.code >= K_CODE_SEARCH_SUCCESS_MINIMUM;
      this.setState({
        payload: isSearchSuccess
          ? response.payload.length > K_CODE_SEARCH_SUCCESS_MINIMUM
            ? response.payload
            : [{ name: "Not found!" }]
          : [{ name: response.status }]
      });
      setToken(isSearchSuccess ? getToken() : "");
    });
  };

  onChangeDebounced = () => {
    this.actionSearch();
  };

  renderNavBar() {
    const { setToken, classes } = this.props;
    return (
      <Grid container className={classes.navBar}>
        <Grid item xs>
          <Typography component="h1" variant="h6">
            ITB NIM Finder
          </Typography>
        </Grid>
        <Grid item>
          <Link
            href="#"
            onClick={() => {
              setToken("");
            }}
            variant="body2"
          >
            Logout
          </Link>
        </Grid>
      </Grid>
    );
  }

  renderCountOptions() {
    const { classes } = this.props;
    const { count } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="rows">Rows per page</InputLabel>
        <Select
          native
          value={count}
          onChange={this.handleCountChange}
          inputProps={{
            name: "rows",
            id: "rows"
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>
      </FormControl>
    );
  }

  renderSearchField() {
    const { classes } = this.props;
    return (
      <TextField
        className={classes.searchField}
        variant="outlined"
        margin="normal"
        fullWidth
        label="Search by name or ID"
        autoFocus
        onChange={this.handleInputChange}
      />
    );
  }

  renderBottomBar() {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Pagination
            limit={10}
            offset={this.state.offset}
            total={100}
            onClick={(e, offset, page) => {
              this.handlePageChange(e, offset, page - 1);
            }}
          />
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, getToken } = this.props;
    const { payload } = this.state;
    return getToken() ? (
      <Container component="main" maxWidth="md">
        {this.renderNavBar()}
        {this.renderSearchField()}
        <Paper className={classes.root}>
          <Table>
            <colgroup>
              <col width="30%" />
              <col width="20%" />
              <col width="20%" />
              <col width="30%" />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>NIM TPB</TableCell>
                <TableCell>NIM Jurusan</TableCell>
                <TableCell>Prodi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payload.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.nim_tpb}</TableCell>
                  <TableCell>{row.nim_jur}</TableCell>
                  <TableCell>{row.prodi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {this.renderBottomBar()}
        </Paper>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
        >
          {this.renderCountOptions()}
        </Grid>
      </Container>
    ) : (
      <Redirect to={K_ROUTE_LOGIN} />
    );
  }
}

Searcher.propTypes = {
  classes: PropTypes.object.isRequired,
  setToken: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired
};

export default withStyles(styles)(Searcher);
