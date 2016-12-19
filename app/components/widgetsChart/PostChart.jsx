
//   www/recharts.org

import React, { PropTypes }     from 'react';
import noop                     from 'lodash/noop';
import PostAdd                  from '../board/PostAdd';
import icons                    from '../../constants/icons';
import style                    from '../board/PostBoard.scss';
import {ResponsiveContainer,
        LineChart, BarChart,
        PieChart, Bar, Pie,
        Line, XAxis,
        YAxis, CartesianGrid,
        Tooltip, Legend}        from 'recharts';



///////////////////////////////////////////////////////
const PostColumn = ({ currentUser, posts, type, icon, placeholder, onAdd, onDelete,
                      onLike, onUnlike, onEdit }) => {
    const data = [
          {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
          {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
          {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
          {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
          {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
          {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
          {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
          ];
    const data01 = [
          {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
          {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
          {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

   const data02 = [
          {name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
          {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
          {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

  return (
    <div>
      <ResponsiveContainer minWidth={300} minHeight={300}>
      <LineChart  width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer minWidth={300} minHeight={300}>
      <PieChart width={300} height={300}>
        <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
        <Tooltip/>
       </PieChart>
      </ResponsiveContainer>

      <BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="pv" fill="#8884d8" />
       <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>

  )
};

PostColumn.propTypes = {
    currentUser: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    onEdit: PropTypes.func
};

PostColumn.defaultProps = {
    currentUser: null,
    posts: [],
    type: 'Chart',
    icon: icons.add_circle,
    placeholder: 'New Comment',
    onAdd: noop,
    onDelete: noop,
    onLike: noop,
    onUnlike: noop,
    onEdit: noop
};

export default PostColumn;
