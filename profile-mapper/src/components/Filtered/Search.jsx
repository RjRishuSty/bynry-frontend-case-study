import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const handlerSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handlerClear = () => {
    setSearchText('');
  };
  return (
    <>
      <TextField
        type="text"
        id="search"
        variant="outlined"
        placeholder="Search user..."
        onChange={handlerSearch}
        value={searchText}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchText.length > 0 ? (
                <IconButton onClick={handlerClear}>
                  <CloseIcon fontSize="small" sx={{ color: "text.default" }} />
                </IconButton>
              ) : (
                <SearchIcon fontSize="small" sx={{ color: "text.disabled" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default Search;
