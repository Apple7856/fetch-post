import { alpha, AppBar, Avatar, Badge, InputBase, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Cancel, Mail, Notifications, Search } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyle = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "30%",
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(2),
  },
}));

type SearchProps = {
  handleSearch: (e: any) => void
}

const Navbar = ({handleSearch}:SearchProps) => {
  const classes = useStyle();

  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' className={classes.logo}>
          Fetch-Post
        </Typography>
        <div className={classes.search}>
          <Search />
          {/* <input placeholder='Search...' data-testid="searchBar" value="SearchData" className={classes.input} onChange={(e)=>handleSearch(e)} type="text" /> */}
          <InputBase placeholder='Search...' data-testid="searchBar" value="SearchData" className={classes.input} onChange={(e)=>handleSearch(e)} />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
