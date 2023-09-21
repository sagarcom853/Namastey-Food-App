import { FAQ } from './utils/constant'
import { useState } from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from "@mui/material/Typography";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';




const HelpPage = () => {
  const [expanded, setExpanded] = useState(Array(FAQ.length).fill(false));
  console.log('expanded',expanded)

  const ToggleIcon = ({ index }) => {
    return expanded[index] ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />;
  };

  const handleChange = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className={`w-3/4 mx-auto`}>
      <div className='bg-black text-white h-16 w-full mt-4 my-0 flex justify-center items-center '>
        <h1 className='font-bold text-lg'>FAQ's</h1>
      </div>
      {/* */}
      {FAQ.map((quest, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded[index]}
            onChange={() => handleChange(index)}
            className={`mt-1 mb-3 transition-all duration-300 ease-in-out `}
          >
            <AccordionSummary
              expandIcon={<ToggleIcon index={index} />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
              className={``}
            >
              <Typography className='font-sans font-semibold'>
                {quest.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className='font-sans font-gray-300'>{quest.description}</div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default HelpPage;
