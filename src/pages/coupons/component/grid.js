import React from 'react';
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from 'reactstrap';

const couponGrid = ({couponItems}) => {

    const parseDate = (date) => {
        let dateSet = date.toDateString().split(' ');
    
        return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
      }


    return (
        <div className="table-responsive bg-white">
        <Table>
          <thead>
            <tr className="fs-sm">
              <th className="hidden-sm-down">#</th>
              <th className="hidden-sm-down">Picture</th>
              <th>Coupon Code</th>
              <th>Coupon Type</th>
              <th>Discount Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th></th>

              <th />
            </tr>
          </thead>
          <tbody>
            {
            couponItems.map(row =>
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <img className="img-rounded" src={row.image} alt="" height="50" />
                </td>
                <td>
                  {row.coupon_code}

                </td>
                <td>
                  <p className="mb-0">
                    <small>
                      <span className="fw-semi-bold">&nbsp; {row.coupon_type}</span>
                    </small>
                  </p>
                  
                </td>
                <td>
                  <p className="mb-0">
                    <small>
                      <span className="fw-semi-bold">&nbsp; {row.discount_type}</span>
                    </small>
                  </p>
                  
                </td>
                <td className="text-semi-muted">
                  {parseDate(row.start_date)}
                </td>
                <td className="text-semi-muted">
                {parseDate(row.end_date)}
                </td>
                <td className="width-150">                 
                    <Badge color={row.status === 'Active' ? 'success':'danger'}>{row.status}</Badge>
                </td>
                <td></td>
              </tr>
            )
          }
          </tbody>
        </Table>
        </div>



    )

}


export default couponGrid
