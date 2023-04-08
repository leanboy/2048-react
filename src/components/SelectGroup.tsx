import * as React from 'react';
import {MenuItem, Select, Stack, Typography} from "@mui/material";
import { uiSlice} from "../store/uiSlice";
import {useDispatch} from "react-redux";

export const SelectGroup = () => {
  const countSelectArr: number[] = [4, 5, 6];

  const [tilePerRow, setTilePerRow] = React.useState<number>(countSelectArr[0]);
  const dispatch = useDispatch();
  const handleCountSelectChange = (e: any) => {
    setTilePerRow(e.target.value);
    dispatch(uiSlice.actions.changeTileCount(e.target.value));
  }

  return (
    <Stack>
      <Select
        value={tilePerRow}
        variant={'standard'}
        sx={{width: 70,
          "&:before": { borderWidth: 3 },
          "&:hover:not(.Mui-disabled):before": { borderWidth: 5 }}}
        onChange={handleCountSelectChange}
      >
        {countSelectArr.map((item) => (
          <MenuItem key={item} value={item}>
            <Typography variant={'h5'}>
              {item}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}
