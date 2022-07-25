import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const CloneGooglePresentation = () => (
  <Paper sx={{ py: 2, px: 3, mt: 5 }}>
    <Box display="flex" alignItems="center">
      <HelpIcon color="primary" />
      <Typography variant="body1" mt={2} ml={2}>
        This tool helps you create an interactive SAF presentation. If you
        prefer to use a static google presentation, then feel free to copy
        <Link
          href="https://docs.google.com/presentation/d/13TQ1RPHgtE8Z8qg3-0A8H3yggPyYUhgRhv_P3ZDBCyI/copy"
          target="_blank"
          rel="noopener noreferrer"
          mx={1}
        >
          this google presentation
        </Link>
        and replace all generic yellow content with your own content
      </Typography>
    </Box>
  </Paper>
);
