import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { IJobDetails , IInterViewSettings} from "../../interface/forms";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [page, setPage] = useState<PageNumbers>(0);
  const [requisitionDetails, setRequisitionDetails] = useState<IRequisitionDetails>({requisitionTitle: "",
    noOfOpenings: 0,
    urgency: "",
    gender: ""});

const [jobDet, setJobDet] = useState<IJobDetails>({
  jobTitle: "",
  jobDetails: "",
  jobLocation: "",
});

const [int, setInt] = useState<IInterViewSettings>({
  interviewMode:"",
  interviewDuration:"",
  interviewLanguage:"",
});
  const handlePage = (pageNumber: PageNumbers, values: any, formtype: string) => {
    setPage(pageNumber);
    if(formtype==="requisition"){
      setRequisitionDetails(values);
    }else if(formtype==="job"){
      setJobDet(values);
    }else if(formtype==="interview"){
      setInt(values);
    }
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior="keepMounted">
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm handleTab={handlePage} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm handleTab={handlePage} />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm handleTab={handlePage} />
              </TabPanel>
            </TabPanels>
            <DisplayCard requisitionDetails={requisitionDetails} jobDetails={jobDet} interviewSettings={int} />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
