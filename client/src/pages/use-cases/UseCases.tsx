import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { CustomDatePicker } from "../../components/DatePicker";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { DefaultOption } from '../../common/common.constant';
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
  const onChangeText = (name: string, text: string | number) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeMultipleSelect = (name : string , id : string[]) => {
    setFormState({...formState , [name] : id})
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
            onChangeText={onChangeText} type={"text"} value={""}          />
          <MultipleSelect
            name="Process Parent"
            itemId="processParentId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Standard Parent"
            itemId="standardParenId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="System"
            itemId="systemId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Use Case Cluster"
            itemId="useCaseClusterId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Plant"
            itemId="plantId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Process"
            itemId="processId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Priority"
            itemId="priority"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Machine"
            itemId="machineId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Risk"
            itemId="riskId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Type"
            itemId="type"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Category"
            itemId="category"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Description Rating"
            itemId="descriptionRating"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <MultipleSelect
            name="Service Line"
            itemId="serviceLineId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Responsible Person"
            itemId="responsiblePerson"
            onChangeText={onChangeText} type={"text"} value={""}          />
          <CustomDatePicker
            name="Collection Date"
            itemId="collectionDate"
            onChangeText={onChangeText}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Target Definition"
            itemId="targetDefinition"
            onChangeText={onChangeText} type={"text"} value={""}          />
          <TextComponent
            icon={<AbcIcon />}
            name="Major Issue Definition"
            itemId="majorIssueDefinition"
            onChangeText={onChangeText} type={"text"} value={""}          />
          <TextComponent
            icon={<AbcIcon />}
            name="Relevant Tags"
            itemId="relevantTags"
            onChangeText={onChangeText} type={"text"} value={""}          />
          <TextComponent
            icon={<AbcIcon />}
            name="Blocking Points"
            itemId="blockPoints"
            onChangeText={onChangeText} type={"text"} value={""}          />
          <MultipleSelect
            name="Blocking Points Service"
            itemId="blockPointsService"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}

          />
          <TextComponent
            icon={<AbcIcon />}
            name="Comment"
            itemId="comment"
            onChangeText={onChangeText} type={"text"} value={""}          />
          <TextComponent
            icon={<AbcIcon />}
            name="Project Name"
            itemId="projectName"
            onChangeText={onChangeText} type={"text"} value={""}          />

          <MultipleSelect
            name="Communication Stream"
            itemId="communicationStreamId"
            onChangeSelect={onChangeMultipleSelect}
            options={DefaultOption}
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
