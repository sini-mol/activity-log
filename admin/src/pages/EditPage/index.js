/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
import Calendar from "@strapi/icons/Calendar";
import pluginId from "../../pluginId";
import axios from "axios";
import {
  Layout,
  Box,
  Flex,
  ModalLayout,
  ModalBody,
  ModalHeader,
  Typography,
  EmptyStateLayout,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  BaseCheckbox,
  VisuallyHidden,
  BaseHeaderLayout,
  Link,
  IconButton,
  Field,
  Stack,
  FieldLabel,
  FieldInput,
  JSONInput,
  Pagination,
  PreviousLink,
  NextLink,
  Grid,
  SearchForm,
  Searchbar,
} from "@strapi/design-system";
import { ArrowLeft, Eye } from "@strapi/icons";
import { func } from "prop-types";
const BASE_URL = process.env.STRAPI_ADMIN_BACKEND_URL;

function EditPage() {
  /* Fetch the data */
  const [logList, setLogs] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [modalContent, setModalContent] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const [searchTerm, setSearchTerm] = React.useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  async function handleEditClick(id) {
    // Open the modal and set the selected item ID
    setSelectedItemId(id);
    const postData = {
      id: id,
    };
    const logs = await axios.post(
      `${BASE_URL}/${pluginId}/view-log-details`,
      postData
    );
    setIsModalOpen(true);
    setModalContent(logs.data);
  }

  async function handleCloseModal() {
    // Close the modal
    setIsModalOpen(false);
  }
  async function FetchActivityLogs() {
    const logs = await axios.get(`${BASE_URL}/${pluginId}/get-log-details`);

    setLogs(logs.data);
  }

  async function handleSearchChange(event) {
    const { value } = event.target;
    setSearchTerm(value);
    const postData = {
      search_term: value,
    };
    const logs = await axios.post(
      `${BASE_URL}/${pluginId}/get-search-details`,
      postData
    );

    setLogs(logs.data);
  }

  async function handleClearSearch() {
    setSearchTerm("");
    FetchActivityLogs();
  }
  /** set the data */
  React.useEffect(() => {
    FetchActivityLogs();
    // handleCloseModal();
  }, []);

  const totalPages = Math.ceil(logList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = logList.slice(startIndex, endIndex);
  const sub_title = logList.length + " entries found";
  return (
    <Box padding={8} background="neutral100">
      <BaseHeaderLayout
        navigationAction={
          <Link starticon={<ArrowLeft />} to="/">
            Go back
          </Link>
        }
        title="Activity Logs"
        as="h2"
        subtitle={sub_title}
      />
      <Box padding={4} background="neutral100">
        <SearchForm style={{ width: "800px" }}>
          <Searchbar
            name="searchbar"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
          ></Searchbar>
        </SearchForm>
      </Box>
      {logList.length == 0 ? (
        <Box padding={8} background="neutral100">
          <EmptyStateLayout content="You don't have any activity logs..." />
        </Box>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">User</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Model</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Target ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Action</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((details, index) => {
              return (
                <Tr>
                  <Td>
                    <Typography textColor="neutral800">{details.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {details.user}
                    </Typography>
                  </Td>
                  <Td>
                    {" "}
                    <Typography textColor="neutral800">
                      {details.model}
                    </Typography>
                  </Td>
                  <Td>
                    {" "}
                    <Typography textColor="neutral800">
                      {details.target_id}
                    </Typography>
                  </Td>
                  <Td>
                    {" "}
                    <Typography textColor="neutral800">
                      {details.action}
                    </Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton
                        onClick={() => handleEditClick(details.id)}
                        label="View"
                        noBorder
                        icon={<Eye />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
      {isModalOpen && (
        <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Activity Log
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Field name="user">
              <Stack spacing={2}>
              <Flex direction="row" alignItems="flex-start" gap={4}>
                <Flex direction="column" alignItems="flex-start" gap={2}>
                  <FieldLabel>User</FieldLabel>
                  <FieldInput
                    type="text"
                    value={modalContent.user}
                    style={{ width: "350px" }}
                  />
                </Flex>

                <Flex direction="column" alignItems="flex-start" gap={2}>
                  <FieldLabel>Model</FieldLabel>
                  <FieldInput
                    type="text"
                    value={modalContent.model}
                    style={{ width: "350px" }}
                  />
                </Flex>
              </Flex>

              <Flex direction="row" alignItems="flex-start" gap={4}>
                <Flex direction="column" alignItems="flex-start" gap={2}>
                <FieldLabel>Type</FieldLabel>
              <FieldInput type="text" value={modalContent.type}
                    style={{ width: "350px" }}
                  />
                </Flex>

                <Flex direction="column" alignItems="flex-start" gap={2}>
                <FieldLabel>Target ID</FieldLabel>
              <FieldInput type="text" value={modalContent.target_id}
                    style={{ width: "350px" }}
                  />
                </Flex>
              </Flex>

              <Flex direction="row" alignItems="flex-start" gap={4}>
                <Flex direction="column" alignItems="flex-start" gap={2}>
                <FieldLabel>Action</FieldLabel>
              <FieldInput type="text" value={modalContent.action} 
                    style={{ width: "350px" }}
                  />
                </Flex>

                <Flex direction="column" alignItems="flex-start" gap={2}>
                <FieldLabel>Created At</FieldLabel>
              <FieldInput type="text" value={modalContent.createdAt}
                    style={{ width: "350px" }}
                  />
                </Flex>
              </Flex>

              <Flex direction="row" alignItems="flex-start" gap={4}>
                <Flex direction="column" alignItems="flex-start" gap={2}>
                <FieldLabel>Created By</FieldLabel>
              <FieldInput type="text" value={modalContent.created_by}
                    style={{ width: "350px" }}
                  />
                </Flex>

                <Flex direction="column" alignItems="flex-start" gap={2}>
                <FieldLabel>Updated At</FieldLabel>
              <FieldInput type="text" value={modalContent.updatedAt}
                    style={{ width: "350px" }}
                  />
                </Flex>
              </Flex>

              <Flex direction="row" alignItems="flex-start" gap={4}>
                <Flex direction="column" alignItems="flex-start" gap={2}>
                <FieldLabel>Updated By</FieldLabel>
              <FieldInput type="text" value={modalContent.updated_by}
                    style={{ width: "350px" }}
                  />
                </Flex>

              </Flex>

              <FieldLabel>Before Data</FieldLabel>
              <JSONInput
                value={JSON.stringify(modalContent.before_data, null, 2)}
                minHeight="235px"
              />
              <FieldLabel>After Data</FieldLabel>
              <JSONInput
                disabled
                value={JSON.stringify(modalContent.after_data, null, 2)}
                minHeight="235px"
              />
              <FieldLabel>Data Difference</FieldLabel>
              <JSONInput
                disabled
                value={JSON.stringify(modalContent.difference_data, null, 2)}
                minHeight="235px"
              />
              </Stack>
            </Field>
          </ModalBody>
        </ModalLayout>
      )}
      {/* Pagination */}
      <Box marginTop={5} textAlign="center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            style={{
              marginRight: "5px",
              padding: "5px 10px",
              backgroundColor: currentPage === i + 1 ? "lightgray" : "white",
            }}
          >
            {i + 1}
          </button>
        ))}
      </Box>
    </Box>
  );
}

export default memo(EditPage);
