import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputWithButton from '../../atoms/input/InputWithButton';

import EditUserHeader from '../headers/EditUserHeader';
import {ReactComponent as Edit} from "../../../images/icons/edit-input.svg";
import { restApi } from '../../../restApi';
import { useSearchParams } from 'react-router-dom';

const EditPollPairAmount = () => {
  const [searchParams] = useSearchParams();

  const [pairAmount, setPairAmount] = useState();
  const [pollId, setPollId] = useState();
  const [name, setName] = useState();

  const handleSave = async () => {
    if (pairAmount) {
      const res = await restApi.setPollPairAmountById({item_amount: pairAmount, id: pollId});
      if(res.rowCount) {
        console.log('Change success');
      }
    } else {
      console.log('Pair should have some value');
    }
  }

  useEffect(() => {
    const getPoll = async (id) => {
      const res = await restApi.getPollById(id);
      setPollId(res.poll_id);
      setPairAmount(res.number_of_items);
      setName(res.name);
    }
    if(searchParams) {
      getPoll(searchParams.get('poll_id'));

    }
  }, [searchParams])

  return (
    <section>
      <EditUserHeader clickSave={handleSave} navigateTo={`../new-poll?poll=${pollId}&name=${name}`}/>
      <InputWithButton
        inputId='vote-name'
        labelContent='Vote pair amount'
        valueSet={pairAmount}
        type='number'
        disabled={true}
        handleValueChange={value => setPairAmount(value)}
      >
        <Edit />
      </InputWithButton>
    </section>
  );
}

EditPollPairAmount.propTypes = {
  user: PropTypes.object,
  handleChange: PropTypes.func,
}

export default EditPollPairAmount;