import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Collapse
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  FamilyRestroom as FamilyRestroomIcon,
  ExpandMore as ExpandMoreIcon,
  PersonAdd as PersonAddIcon
} from "@mui/icons-material";
import { styled } from "@mui/system";
import _ from "lodash";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FamilyCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: 16,
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  display: "inline-block",
  minWidth: 200,
  textAlign: "center",
}));

const TreeContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Branch = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 20,
  gap: 20,
});

function FamilyMember({ member }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <TreeContainer>
      <FamilyCard variant="outlined">
        <CardHeader
          avatar={
            <Tooltip
              title={`${_.size(member.children)} Children`}
              arrow
            >
              <Badge
                color="primary"
                badgeContent={_.size(member.children)}
                overlap="circular"
              >
                <Avatar sx={{ bgcolor: "#ECECF4" }}>
                  <FamilyRestroomIcon color="primary" />
                </Avatar>
              </Badge>
            </Tooltip>
          }
          title={member.name}
          action={
            <>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <PersonAddIcon fontSize="small" sx={{ mr: 1 }} />
                  Add Child
                </MenuItem>
              </Menu>
            </>
          }
        />
        {member.children && member.children.length > 0 && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </FamilyCard>

      {member.children && member.children.length > 0 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Branch>
            {member.children.map((child, idx) => (
              <FamilyMember key={idx} member={child} />
            ))}
          </Branch>
        </Collapse>
      )}
    </TreeContainer>
  );
}

// Sample Data
const familyData = {
  name: "Grandparent",
  children: [
    {
      name: "Parent 1",
      children: [
        { name: "Child 1", children: [] },
        { name: "Child 2", children: [] }
      ]
    },
    {
      name: "Parent 2",
      children: [{ name: "Child 3", children: [] }]
    }
  ]
};

export default function FamilyTree() {
  return (
    <div style={{ padding: 40 }}>
      <FamilyMember member={familyData} />
    </div>
  );
}
