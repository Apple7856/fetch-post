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



const Navbar: React.FC = () => {
  const classes = useStyle();

  function getSearchData(e:any) {
    const inputVal = e.target.value.toLowerCase();
    const tableRow = document.getElementsByClassName('tableRow');
    Array.from(tableRow).forEach(function (element) {
      let title = element.getElementsByClassName("title")[0].innerHTML;
      let url = element.getElementsByClassName('url')[0].innerHTML;
      let author = element.getElementsByClassName('author')[0].innerHTML;
      if (title.includes(inputVal) || url.includes(inputVal) || author.includes(inputVal)) {
        element.style.display = "block";
      }
      else {
        element.style.display = "none";
      }
  })
  }
  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' className={classes.logo}>
          Fetch-Post
        </Typography>
        <div className={classes.search}>
          <Search />
          <InputBase placeholder='Search...' className={classes.input} onChange={(e)=>getSearchData(e)} />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
