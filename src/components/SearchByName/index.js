import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { debounce } from "lodash";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

import {
  K_ROUTE_LOGIN,
  K_ROUTE_BY_ID,
  K_CODE_SEARCH_SUCCESS_MINIMUM
} from "utils/constants";

import getApiByName from "libs/getApiByName";

class SearchByName extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      count: 10,
      page: 1,
      payload: []
    };
    this.onChangeDebounced = debounce(this.onChangeDebounced, 300);
  }

  handleInputChange = event => {
    this.setState({
      query: event.target.value
    });
    this.onChangeDebounced();
  };

  actionSearch() {
    const { setToken, getToken } = this.props;
    const { query, count, page } = this.state;
    getApiByName(query, count, page, getToken()).then(response => {
      const isSearchSuccess = response.code >= K_CODE_SEARCH_SUCCESS_MINIMUM;
      setToken(isSearchSuccess ? getToken() : "");
      this.setState({ payload: isSearchSuccess ? response.payload : [] });
    });
  }

  onChangeDebounced = () => {
    this.actionSearch();
  };

  renderNavBar = () => (
    <Grid container>
      <Grid item xs>
        <Link
          href="#"
          onClick={() => {
            setToken("");
            console.log(getToken());
          }}
          variant="body2"
        >
          Logout
        </Link>
      </Grid>
      <Grid item>
        <Link href={K_ROUTE_BY_ID} variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
  );

  renderSearchField() {
    const { classes } = this.props;
    return (
      <TextField
        className={classes.searchField}
        variant="outlined"
        margin="normal"
        fullWidth
        id="id"
        label="Search by name"
        name="id"
        autoComplete="id"
        autoFocus
        onChange={event => {
          this.setState({
            query: event.target.value
          });
          this.onChangeDebounced();
        }}
      />
    );
  }

  render() {
    const { classes, getToken, setToken } = this.props;
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
        </Paper>
      </Container>
    ) : (
      <Redirect to={K_ROUTE_LOGIN} />
    );
  }
}

SearchByName.propTypes = {
  classes: PropTypes.object.isRequired,
  setToken: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchByName);
