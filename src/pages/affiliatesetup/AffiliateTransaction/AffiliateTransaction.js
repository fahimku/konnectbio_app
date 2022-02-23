import React from "react";
import axios from "axios";
import { Button, Row, Col, Table } from "react-bootstrap";

function AffiliateTransaction() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <h4 className="page-title">Transactions</h4>
        <div className="brand_container_main container aff-payment">
          <Row>
            <div className="col-md-8">
              <Table responsive="sm" className="transactions-box">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>334342</td>
                    <td>$100</td>
                    <td>Paid</td>
                    <td>25th Feb 2022</td>
                    <td className="text-center">
                      <i class="fa fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>334343</td>
                    <td>$100</td>
                    <td>Paid</td>
                    <td>22th Feb 2022</td>
                    <td className="text-center">
                      <i class="fa fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>334344</td>
                    <td>$100</td>
                    <td>Pending</td>
                    <td>26th Feb 2022</td>
                    <td className="text-center">
                      <i class="fa fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>334344</td>
                    <td>$100</td>
                    <td>Pending</td>
                    <td>26th Feb 2022</td>
                    <td className="text-center">
                      <i class="fa fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>334344</td>
                    <td>$100</td>
                    <td>Pending</td>
                    <td>26th Feb 2022</td>
                    <td className="text-center">
                      <i class="fa fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>334344</td>
                    <td>$100</td>
                    <td>Pending</td>
                    <td>26th Feb 2022</td>
                    <td className="text-center">
                      <i class="fa fa-eye"></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AffiliateTransaction;
