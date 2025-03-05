import { extendTheme } from '@mui/material/styles';

//personaluzando style
const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    //light: '#757ce8',
                    light: "#01003A",
                    //main: '#3f50b5',
                    main: "#01003A",
                    //dark: '#002884',
                    dark: "#01003A",
                    contrastText: '#fff',
                },
            }
        },
        dark: {
            palette: {
                primary: {
                    //light: '#757ce8',
                    light: "#FFFFFF",
                    //main: '#3f50b5',
                    main: "#FFFFFF",
                    //dark: '#002884',
                    dark: "#FFFFFF",
                    contrastText: '#fff',
                },
            }
        }
    },
    colorSchemeSelector: "class"
});

export default theme