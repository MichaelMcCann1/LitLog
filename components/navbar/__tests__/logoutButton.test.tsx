import { render, screen } from "@testing-library/react";
import LogoutButton from "../components/navBarComponents/logoutButton";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

describe("logoutButton", () => {
  it("fires the callback function when clicked", async () => {
    const mockCallback = jest.fn();
    render(
      <DropdownMenu open={true}>
        <DropdownMenuContent>
          <LogoutButton callback={mockCallback} />
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockCallback).toHaveBeenCalled();
  });
});
