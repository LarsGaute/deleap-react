import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { IGoal } from 'app/shared/model/goal.model';
import { getEntity, updateEntity, createEntity, reset } from './goal.reducer';

export const GoalUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const courses = useAppSelector(state => state.course.entities);
  const goalEntity = useAppSelector(state => state.goal.entity);
  const loading = useAppSelector(state => state.goal.loading);
  const updating = useAppSelector(state => state.goal.updating);
  const updateSuccess = useAppSelector(state => state.goal.updateSuccess);
  const handleClose = () => {
    props.history.push('/goal');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCourses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...goalEntity,
      ...values,
      course: courses.find(it => it.id.toString() === values.course.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...goalEntity,
          course: goalEntity?.course?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="deleapApp.goal.home.createOrEditLabel" data-cy="GoalCreateUpdateHeading">
            <Translate contentKey="deleapApp.goal.home.createOrEditLabel">Create or edit a Goal</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="goal-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('deleapApp.goal.name')} id="goal-name" name="name" data-cy="name" type="text" />
              <ValidatedField label={translate('deleapApp.goal.parent')} id="goal-parent" name="parent" data-cy="parent" type="text" />
              <ValidatedField
                label={translate('deleapApp.goal.goalValue')}
                id="goal-goalValue"
                name="goalValue"
                data-cy="goalValue"
                type="text"
              />
              <ValidatedField
                label={translate('deleapApp.goal.goalFocus')}
                id="goal-goalFocus"
                name="goalFocus"
                data-cy="goalFocus"
                type="text"
              />
              <ValidatedField
                label={translate('deleapApp.goal.whyAchieveThis')}
                id="goal-whyAchieveThis"
                name="whyAchieveThis"
                data-cy="whyAchieveThis"
                type="text"
              />
              <ValidatedField
                label={translate('deleapApp.goal.roadAhead')}
                id="goal-roadAhead"
                name="roadAhead"
                data-cy="roadAhead"
                type="text"
              />
              <ValidatedField
                label={translate('deleapApp.goal.whatToAchieve')}
                id="goal-whatToAchieve"
                name="whatToAchieve"
                data-cy="whatToAchieve"
                type="text"
              />
              <ValidatedField
                label={translate('deleapApp.goal.whatToLearn')}
                id="goal-whatToLearn"
                name="whatToLearn"
                data-cy="whatToLearn"
                type="text"
              />
              <ValidatedField
                label={translate('deleapApp.goal.whyFocusOnThis')}
                id="goal-whyFocusOnThis"
                name="whyFocusOnThis"
                data-cy="whyFocusOnThis"
                type="text"
              />
              <ValidatedField
                label={translate('deleapApp.goal.goaldone')}
                id="goal-goaldone"
                name="goaldone"
                data-cy="goaldone"
                check
                type="checkbox"
              />
              <ValidatedField id="goal-course" name="course" data-cy="course" label={translate('deleapApp.goal.course')} type="select">
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/goal" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default GoalUpdate;