import React, { useState, useEffect } from "react";
import grapesjs from 'grapesjs';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';
import { UilFileAlt, UilArrowLeft } from '@iconscout/react-unicons';
import { Box, Button, Typography, Grid, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';

const CustomForm = () => {
  const navigate = useNavigate();
  const formName = useSelector(state => state.templateform.formname);
  const userInfo = useSelector(state => state.auth.user);
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fname = queryParams.get('fname');
  const action = queryParams.get('action');
  const tname = queryParams.get('tname');

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      plugins: [
        grapesjsBlocksBasic,
        grapesjsPresetWebpage,
      ],
    });

    editor.on('component:update', () => {
      setHtml(editor.getHtml());
      setCss(editor.getCss());
    });

    editor.BlockManager.add('Nhập nội dung', {
      label: 'Input',
      category: 'Forms',
      attributes: { class: 'fa fa-square', title: 'Input' },
      content: '<input type="text" placeholder="Input">',
    });

    return () => {
      editor.destroy();
    };
  }, []);

  const handleSaveFile = () => {
    axios.post('http://localhost:5003/api/v1/media/file/writehtml', {
      "filename": formName,
      "content": `<style>${css}</style>${html}`
    })
      .then((res) => {
        axios.post("http://localhost:5002/api/v1/forms", {
          "user_id": userInfo.user.identity_id,
          "formname": formName,
          "filepath": res.data.key
        })
        navigate('/managerform');
      })
      .catch(error => {
        console.error('Error saving file:', error);
      });
  };

  const saveToFile = () => {
    handleSaveFile();
  };

  const onBack = () => {
    navigate('/managerform');
  };

  return (
    <>
      <Box p={1} bgcolor="#f5f5f5" borderRadius="8px">
        <Grid container alignItems="center" justifyContent="space-between" mb={2}>
          <Grid item>
            <Box display="flex" alignItems="center">
              <IconButton onClick={onBack} color="primary">
                <UilArrowLeft size="30" />
              </IconButton>
              <UilFileAlt size="30" />
              {
                action === "edit" && (
                  <Typography variant="h6" component="div" ml={1}>
                    {tname}
                  </Typography>
                )
              }
              {
                action !== "edit" && (
                  <Typography variant="h6" component="div" ml={1}>
                    {formName}
                  </Typography>
                )
              }
            </Box>
          </Grid>
          <Grid item>
            {
              action === "edit" && (
                <Button variant="contained" color="primary" onClick={saveToFile}>
                  Cập nhật mẫu
                </Button>
              )
            }
            {
              action !== "edit" && (
                <Button variant="contained" color="primary" onClick={saveToFile}>
                  Lưu mẫu
                </Button>
              )
            }
          </Grid>
        </Grid>
      </Box>
      <div id="gjs"></div>
    </>
  );
};

export default CustomForm;
