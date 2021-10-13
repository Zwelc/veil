import { AppBar } from "@mui/material";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import Link from 'next/link';
import { InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Router from 'next/router';
import router from "next/router";

const drawerWidth = 200;

export default function Layout({ window, children }) {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	}

	const drawer = (
		<div>
			<Typography variant="h6" component="text">
				Reactive Stats
			</Typography>
			<Toolbar />
			<Divider />
			<List>
				{['Home', 'Heroes', 'Players', 'Matches'].map((text, index) => (
					<Link href={ text == 'Home' ? "/" : `/${text.toLowerCase()}`} key={text}>
					<ListItem button >
					<ListItemText primary={text} />
					</ListItem>
					</Link>
				))}
			</List>
			<Divider />
				<List>
					{['Dota 2', 'OpenDota API'].map((text, index) =>  (
						<ListItem button key={text}>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
		</div>
	)

	const container = window !== undefined ? () => window().document.body : undefined;

	
	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline />
			<AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
					<InputBase
					id="search"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search players"
        inputProps={{ 'aria-label': 'search players' }}
				autoComplete="off"
				onKeyUp={(e) => {
					if(e.code === 'Enter') router.push(`/players?q=${document.querySelector('#search').value}`)}}
      />
      <IconButton 
				type="submit" 
				sx={{ p: '10px' }} 
				aria-label="search" 
				onClick={() => {
					router.push(`/players?q=${document.querySelector('#search').value}`)
				}}>
        <SearchIcon />
      </IconButton>
        </Toolbar>
      </AppBar>
		<Box component="nav"sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} >
			<Drawer 
			container={container}
			variant="temporary"
			open={mobileOpen}
			onClose={handleDrawerToggle}
			ModalProps={{
				keepMounted: true
			}}
			sx={{
				display: {xs: 'block', sm: 'none'},
				'& .MuiDrawer-paper' : { boxSizing: 'border-box', width: drawerWidth},
			}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block'},
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
				}}>
				{drawer}
			</Drawer>
		</Box>
		<Box component="main" sx={{ flexGrow: 1, p: 3, m: 5}}>
			{children}
		</Box>
		</Box>
	)
}
