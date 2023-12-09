import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { SelectComponent } from "../../components/select";
import { CustomDatePicker } from "../../components/datePicker";
import { TextComponent } from "../../components/text";
import { useState } from "react";
import { SubmitButton } from "../../components/submit";
import { BooleanSelection } from "../../components/boolean";
import { useStyles } from "../../styles/common";

//css flex box
export const UseCases = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    name: null,
    processParentId: null,
    standardParenId: null,
    systemId: null,
    useCaseClusterId: null,
    plantId: null,
    processId: null,
    priority: null,
    machineId: null,
    riskId: null,
    type: null,
    category: null,
    descriptionRating: null,
    serviceLineId: null,
    responsiblePerson: null,
    collectionDate: null,
    targetDefinition: null,
    majorIssueDefinition: null,
    relevantTags: null,
    blockPoints: null,
    blockPointsService: null,
    comment: null,
    projectName: null,
    communicationStreamId: null,
    active: null,
  });
  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
 
    <div className={classes.div}>
      <h2 className={classes.headerText}>Use Cases</h2>
      <form onSubmit={handleSubmit}>
       
        <Grid container spacing={1}>
          <TextComponent
            icon={<AbcIcon />}
            name="Name"
            itemId="name"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Process Parent"
            itemId="processParentId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Standard Parent"
            itemId="standardParenId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="System"
            itemId="systemId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Use Case Cluster"
            itemId="useCaseClusterId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Plant"
            itemId="plantId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Process"
            itemId="processId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Priority"
            itemId="priority"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Machine"
            itemId="machineId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Risk"
            itemId="riskId"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Type"
            itemId="type"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Category"
            itemId="category"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Description Rating"
            itemId="descriptionRating"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Service Line"
            itemId="serviceLineId"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Responsible Person"
            itemId="responsiblePerson"
            onChangeText={onChangeText}
          />
          <CustomDatePicker
            name="Collection Date"
            itemId="collectionDate"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Target Definition"
            itemId="targetDefinition"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Major Issue Definition"
            itemId="majorIssueDefinition"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Relevant Tags"
            itemId="relevantTags"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Blocking Points"
            itemId="blockPoints"
            onChangeText={onChangeText}
          />
          <SelectComponent
            name="Blocking Points Service"
            itemId="blockPointsService"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Comment"
            itemId="comment"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Project Name"
            itemId="projectName"
            onChangeText={onChangeText}
          />

          <SelectComponent
            name="Communication Stream"
            itemId="communicationStreamId"
            onChangeText={onChangeText}
          />
          <BooleanSelection
            icon={<AbcIcon />}
            name="Active"
            itemId="active"
            onChangeText={onChangeText}
          />
        </Grid>
    
       
        <Grid container>
          <SubmitButton />
        </Grid>
      </form>
    </div>
  );
};
