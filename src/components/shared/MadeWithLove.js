import React from "react";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

class MadeWithLove extends React.PureComponent {
  render() {
    return (
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Made with love by "}
          <Link color="inherit" href="http://ugm.id/asif">
            Asif
          </Link>
          {" using "}
          <Link color="inherit" href="https://material-ui.com/">
            Material-UI
          </Link>
          {" components."}
        </Typography>
      </Box>
    );
  }
}

export default MadeWithLove;
